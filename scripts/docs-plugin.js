import { mdsvex, escapeSvelte } from 'mdsvex';
import { join } from 'path';
import { createHighlighter } from 'shiki';
import { visit } from 'unist-util-visit';
import {
	getPathNames,
	generateDynamicComponent,
	string2meta
} from '../src/lib/docs/plugins/index.js';

const { __dirname } = getPathNames(import.meta.url);

const shikiHighlighter = await createHighlighter({
	themes: ['github-light', 'github-dark'], // 内置主题（支持 100+ 主题）
	langs: ['svelte', 'javascript', 'typescript', 'html', 'bash'] // 支持的语言
});

export function docsPreprocess() {
    return mdsvex({
        extensions: ['.svx'],
        layout: {
            _: join(__dirname, '../src/lib/docs/layouts/index.svelte')
        },
        highlight: {
            async highlighter(code, lang, metastring) {
                const { name, showLineNumbers } = string2meta(metastring);
                const html = shikiHighlighter.codeToHtml(code, {
                    lang,
                    themes: {
                        light: 'github-light',
                        dark: 'github-dark'
                    },
                    transformers: [
                        {
                            pre(node) {
                                node.properties.class =
                                    'no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent';
                                node.properties.style =
                                    'background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8';
                            },
                            code(node) {
                                if (name || showLineNumbers) node.properties['data-line-numbers'] = '';

                                if (lang === 'bash') {
                                    node.children = []
                                    // node.children = [{
                                    // 	type: 'element',
                                    // 	tagName: 'Installatino',
                                    // 	properties: { class: 'line', 'data-line': '' },
                                    // 	children: [[Object], [Object], [Object], [Object], [Object], [Object]]
                                    // }]
                                }
                            },
                            line(node) {
                                node.properties['data-line'] = '';
                            }
                        }
                    ]
                });
                const url = await generateDynamicComponent(name, code);
                console.log(8888888888888, escapeSvelte(html))
                return [
                    name
                        ? `<ImportComponent>import ${name} from '${url}';</ImportComponent>`
                        : '',
                    `<ComponentPreview lang="${lang}" codestr="${encodeURIComponent(code)}" ${metastring || ''}>
                        ${[
                        name ? `{#snippet code()}
                                <${name} />
                            {/snippet}` : '',
                        lang === 'bash' ? `{#snippet children(installation)}${escapeSvelte(html).split(/<\/code>/)[0]}{@render installation()}</code></pre>{/snippet}` : escapeSvelte(html)
                    ].join('\n')}
                    </ComponentPreview>`
                ].join('');
            }
        },
        rehypePlugins: [
            () => (tree) => {
                // console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO', tree);
                let script;
                let scriptNode;
                const imports = [];

                visit(tree, 'raw', (node) => {
                    const [, _import, code] =
                        node.value.match(/<ImportComponent>([\s\S]*?)<\/ImportComponent>([\s\S]*)$/) ?? [];
                    if (_import) {
                        imports.push(_import.trim());
                        node.value = code;
                    }

                    const [, header, body, footer] =
                        node.value.match(/(<script[^>]*?>)([\s\S]*)(<\/script>)$/) ?? [];
                    if (body) {
                        script = [header, body.trim(), footer];
                        scriptNode = node;
                    }
                });

                if (imports.length) {
                    if (!scriptNode) {
                        script = ['<script lang="ts">', '', '</script>'];
                        scriptNode = {
                            type: 'raw',
                            value: ''
                        };
                        tree.children = [scriptNode, ...tree.children];
                    }

                    const [header, body, footer] = script;

                    scriptNode.value = [header, ...imports, body, footer].join('\n');
                }
                const _tree = tree.children.filter((node) => (node.type !== 'text' || node.value !== '\n'))
                _tree.forEach((node, index) => {
                    const current = node;
                    const next = _tree[index + 1]
                    if (next && current.type === 'raw' && /^<ComponentPreview/.test(current.value) && next.type === 'raw' && /^<ComponentPreview/.test(next.value)) {
                        current.value = current.value.replace(/^<ComponentPreview/, '<ComponentPreview innerClass="mb-4"')
                    }
                })
                // console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO啊啊', tree);
            }
        ]
    })
}
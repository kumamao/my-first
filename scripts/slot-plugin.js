const asChildRegex = new RegExp(
	`(?=<!--[\\s\\S]*?-->|[\\s\\S])*?` + // 跳过前面的注释（非捕获组，不占用结果）
	`(<([a-zA-Z0-9\\-\\.]+)` + // 1. 标签名（自定义组件/普通标签）
	`(?:\\s+[a-zA-Z0-9\\-]+(?:\\s*=\\s*(?:"[^"]*"|'[^']*'|[^'">\\s]+))?)*?` + // 2. asChild 前的任意属性（可选）
	`)\\s+asChild(` + // 3. 无值 asChild（前必须有空格，避免与其他属性粘连）
	`(?:\\s+[a-zA-Z0-9\\-]+(?:\\s*=\\s*(?:"[^"]*"|'[^']*'|[^'">\\s]+))?)*?` + // 4. asChild 后的任意属性（可选）
	`\\s*>)` + // 开始标签结束（asChild 后允许 0 个空格，兼容末尾）
	`([\\s\\S]*?)(<([a-zA-Z0-9\\-\\.]+))([\\s\\S]*?)</\\6>([\\s]*?)` + // 5. 捕获内部内容（支持多行）
	`(</\\2>)`, // 6. 闭合标签（与开始标签同名）
	'gs' // g=全局，s=匹配换行，无 i=大小写敏感
);

export function slotPreprocess() {
    return {
        markup: ({ content, filename }) => {
            if (filename.endsWith('.svelte')) {
                let changed = false;
                let code = content.replace(asChildRegex, (_, $1, $2, $3 = '', $4, $5, $6, $7, $8, $9) => {
                    changed = true
                    // console.log('pppppppppppppppppppppppppppppppppppppp', '$1', $1, '$2', $2, '$3', $3, '$4', $4, '$5', $5, '$6', $6, '$7', $7, '$8', $8, '$9', $9)
                    const isComponent = /^[A-Z]/.test($6)
                    const as = isComponent ? 'div' : $6;
                    return `${$1}${$3}\n{#snippet asChild(__aschild_props__)}${$4}<PrimitiveAsChild.${as}\n as=${isComponent ? `{${$6}}` : `"${$6}"`} defaultProps={__aschild_props__}${$7}</PrimitiveAsChild.${as}>{/snippet}\n${$8}${$9}`
                })
                if (changed) {
                    code = content.replace(/<script lang="ts">\n/, (str) => {
                        return `${str}import { Primitive as PrimitiveAsChild } from '../primitive';\n`
                    })
                }
                return { code }
            }

            return { code: content }
        }
    }
}
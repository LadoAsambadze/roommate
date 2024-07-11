import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    overwrite: true,
    schema: [`${process.env.GRAPHQL_API}, './*/.graphql'`],
    generates: {
        'graphql/typesGraphql.ts': {
            plugins: ['typescript'],
            config: {
                useTypeImports: true,
            },
        },
    },
    hooks: { afterOneFileWrite: ['prettier --write'] },
}

export default config

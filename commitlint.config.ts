import type { UserConfig } from '@commitlint/types'

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'style', 'chore', 'docs', 'test', 'revert'],
    ],
    'scope-empty': [0],
    'subject-case': [0],
  },
}

export default config

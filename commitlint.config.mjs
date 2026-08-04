export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    /* CLAUDE.md promete el tipo `content:` (texto narrativo/guion) además
       de los convencionales; sin esta regla, commitlint lo rechazaba. */
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'content',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
  },
};

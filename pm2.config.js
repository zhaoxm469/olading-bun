// pm2.config.js
module.exports = {
    apps: [
        {
            name: 'olading-bun',
            script: 'src/index.ts',
            interpreter: 'bun',
            watch: true, // 或者 false，根据需要
            node_args: '--watch', // 或者 '--hot'
            env: {
                NODE_ENV: 'production', // 或者 'development'
            },
        },
    ],
};
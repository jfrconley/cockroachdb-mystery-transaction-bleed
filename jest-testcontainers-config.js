const {Client} = require("pg")

module.exports = {
    cockroach: {
        image: "cockroachdb/cockroach",
        tag: 'v22.1.0',
        ports: [26257],
        entrypoint: "cockroach",
        command: ["start-single-node", '--insecure'],
        wait: {
            type: 'text',
            text: 'CockroachDB node starting at'
        },
        async setup() {
            const con = new Client({
                user: "root",
                port: process.env.__TESTCONTAINERS_COCKROACH_PORT_26257__,
                host: process.env.__TESTCONTAINERS_COCKROACH_IP__,
                database: "defaultdb",
            })

            await con.connect();

            await con.query('create table test_table (id int primary key, name text);');

            await con.end();
        }
    }
}

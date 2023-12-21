async function databaseVersion() {
    const version: QueryResult = <{ Variable_name: string; Value: string }[]>(
        await prisma.$queryRaw`SHOW VARIABLES LIKE '%version%';`
    );

    //const version = "8.0.31";
    //return await version[8].Value;

    const value = await mainDB(version);

    console.log("value", value);

    return value;
    //return "8.0.31";
}

async function databaseMaxConnections() {
    const maxConnections: QueryResult = <{ Variable_name: string; Value: string }[]>(
        await prisma.$queryRaw`SHOW VARIABLES LIKE 'max_connections';`
    );

    return Number(maxConnections[0].Value);
}

async function databaseActiveConnections() {
    const activeConnections: QueryResult = <{ Variable_name: string; Value: string }[]>(
        await prisma.$queryRaw`SHOW STATUS WHERE variable_name = 'Threads_connected';`
    );

    return Number(activeConnections[0].Value);
}

async function mainDB(query: any) {
    try {
        const result = await query;
        return result;
    } catch (err) {
        console.log(err);
    } finally {
        await prisma.$disconnect();
    }
}

export default {
    dbVersion: databaseVersion,
    dbMaxConnections: mainDB(databaseMaxConnections),
    dbOpenedConnections: mainDB(databaseActiveConnections),
};

const parseEnv = () => {
    const res = [];

    for (const variable in process.env) {
        if (variable.startsWith('RSS_')) {
            res.push(variable + '=' + process.env[variable]);
        }  
    }
    console.log( res.length  ? res.join('; '): 'No RSS variables');
};

parseEnv();
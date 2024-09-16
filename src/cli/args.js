import { argv } from 'process';

const parseArgs = () => {
    const res = [];
    const args = argv.slice(2);
    args.forEach((val, i) => {
        if (i % 2 === 0) {
            if (val.startsWith('--')){
                res.push(val.slice(2) + ' is ' + args[i + 1]);
            } else {
                throw new Error('Make sure your format is: --propName value --prop2Name value2');
            }
        }
      });
      console.log( res.length  ? res.join(', '): 'No args');
};

parseArgs();
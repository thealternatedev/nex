const Color = require('cli-color');
const child_process = require("child_process");
const rl = require("readline");
const { readdirSync, existsSync } = require('fs');
const path = require('path');
const os = require("os");

/*
    ███╗░░██╗███████╗██╗░░██╗
    ████╗░██║██╔════╝╚██╗██╔╝
    ██╔██╗██║█████╗░░░╚███╔╝░
    ██║╚████║██╔══╝░░░██╔██╗░
    ██║░╚███║███████╗██╔╝╚██╗
    ╚═╝░░╚══╝╚══════╝╚═╝░░╚═╝
    This Nex Project
    A Terminal Created with javascript using the runtime nodejs
 */

(async () => {

    console.log(`
    ███╗░░██╗███████╗██╗░░██╗
    ████╗░██║██╔════╝╚██╗██╔╝
    ██╔██╗██║█████╗░░░╚███╔╝░
    ██║╚████║██╔══╝░░░██╔██╗░
    ██║░╚███║███████╗██╔╝╚██╗
    ╚═╝░░╚══╝╚══════╝╚═╝░░╚═╝
    `);
    
    const interface = rl.createInterface(process.stdin, process.stdout, (line) => {
        let completions;

        if (!line || !line.length) {
            completions = readdirSync(process.cwd());
        } else {
            if (existsSync(line)) {
                completions = readdirSync(line)
            }
            completions = readdirSync(process.cwd());
        }
        let cmds = line.split(' ');
        const hits = completions.filter((c) => c.startsWith(cmds.slice(-1)));
    
        if ((cmds.length > 1) && (hits.length === 1)) {
            let lastCmd = cmds.slice(-1)[0];
            let pos = lastCmd.length;
            rl.line = line.slice(0, -pos).concat(hits[0]);
            rl.cursor = rl.line.length + 1;
        }
    
        return [hits.length ? hits.sort() : completions.sort(), line];
    });
    var input = async () => {
        interface.question(`${Color.greenBright(os.hostname())}:${Color.greenBright(path.basename(os.homedir()))} - ${Color.cyanBright(process.cwd())} | ${Color.yellowBright("$")}: `, (answer) => {
            if (!answer || !answer.length) input();
            try {
                let sync = child_process.execSync(answer, { encoding: "utf-8" });
                if (sync.trim()) {
                    console.log(sync.trim());
                }
                input();
            } catch (err) {
                input();
            }
        });
    }

    input();
})();
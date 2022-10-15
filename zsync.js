import { FilesManager } from 'turbodepot-node';
import fs from 'fs';

const way = process.argv[2] || 'leaderToApps';
const waiting = 5000

let filesManager = new FilesManager();

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//const repos = ['apps', 'apps10']
const repos = fs.readdirSync(`..`).filter(dir => dir !== 'leader');
const paths = ['src/routes/-', 'src/lib/-', 'tests/-', 'static/-']


async function main() {
    while (true) {
        console.log('sync directories...')
        const appsByRepo = {};
        repos.forEach(repo => appsByRepo[repo] = fs.readdirSync(`../${repo}`));

        for(const repo in appsByRepo){
            const apps = appsByRepo[repo];
          
            apps.forEach(app => {
                paths.forEach(p => {
            
                    const source = way === 'leaderToApps' ? `${p}/${app}` : `../${repo}/${app}/${p}`;
                    const target = way === 'leaderToApps' ? `../${repo}/${app}/${p}` : `${p}/${app}`;

                    if (fs.existsSync(source)) {
                        if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true })
                        console.log('mirror', source, 'into', target)
                        filesManager.mirrorDirectory(source, target)
                    }
                })
            })
        }
    
        if (way !== 'leaderToApps') break;
        await sleep(waiting);
    }
}

main()

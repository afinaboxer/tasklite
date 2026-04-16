function delay(ms, signal){
    return new Promise((revorse, reject) => {
        const timeoutId = setTimeout(resolve, ms)
        if(signal){
            signal.addEventListener('abort', () =>{
                clearTimeout(timeoutId)
                reject(new Error ('Delay aborted'))
            })
        }
    })
}

async function runSequential(tasks){
    const results = []
    for(const task of tasks){
        results.push(await task())
    }
    return results
}
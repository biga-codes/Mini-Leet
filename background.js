chrome.runtime.onMessage.addListener((message)=>{
    if(message === 'startRevision'){
        chrome.alarms.create('revisionReminder', {
            periodInMinutes: 15
        });
    }
});


chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'revisionReminder') {
        chrome.storage.sync.get(['revisionQueue'], (data) => {
            const queue = data.revisionQueue || [];
            if (queue.length> 0) {
                const randomIndex = Math.floor(Math.random() * queue.length);   
                const randomProblem = queue[randomIndex];
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'icon.png',
                    title: 'Revision Reminder',
                    message: `Revise ${randomProblem.title}`,
                    buttons: [
                        { title: 'Open Problem' }
                    ]
                });

                chrome.notifications.onButtonClicked.addListener(() => {
                   
                        chrome.tabs.create({ url: randomProblem.url });
                });
               
            }

        });

    }

});


        
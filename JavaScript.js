const apiUrl1 = 'https://emojihub.yurace.pro/api/random/group/face-positive';
const apiUrl2 = 'https://emojihub.yurace.pro/api/random/group/drink';
const apiUrl3 = 'https://emojihub.yurace.pro/api/random/group/body';

const fetchEmoji = async () => {
    try {

        const [res1, res2, res3] = await Promise.all ([
            fetch(apiUrl1),
            fetch(apiUrl2),
            fetch(apiUrl3)
        ]);

        if (!res1.ok || !res2.ok || !res3.ok) {
            throw new Error ('Failed to fetch one or more endpoints');
        }

        const parsedRes1 = await res1.json();
        const parsedRes2 = await res2.json();
        const parsedRes3 = await res3.json();

        return {
            facePositive: parsedRes1,
            drink: parsedRes2,
            body: parsedRes3
        }

    } catch (error) {
        console.error('Failed to retrieve data:', error);
    }
}

const fetchEmojiData = async () => {
    try {

    const emojiData = await fetchEmoji();

    if(!emojiData) {
        throw new Error ('No data returned from fetchEmoji');
    }

    return {
        facepositive: {
        group: emojiData.facePositive.group,
        name: emojiData.facePositive.name,
        unicode: emojiData.facePositive.unicode
    },

        drink: {
        group: emojiData.drink.group,
        name: emojiData.drink.name,
        unicode: emojiData.drink.unicode
    },
    
        body: {
        group: emojiData.body.group,
        name: emojiData.body.name,
        unicode: emojiData.body.unicode
    }
};
    } catch (error) {
        console.error('Error fetching emoji data:', error);
    }

};

const fetchEmojiHandling = async () => {
    try {
        const emojiHandling = await fetchEmojiData();

        if (!emojiHandling) {
            throw new Error ('No data returned from fetchEmojiData');
        }

        console.log(emojiHandling);

    } catch (error) {
        console.error('Error fetching emoji Data', error);
    }
}

fetchEmojiHandling();
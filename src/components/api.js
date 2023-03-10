const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20',
    headers: {
        authorization: '8e826e83-ec2e-4d15-8279-d177b3176ef2',
        'Content-Type': 'application/json'
    }
}

export const getUserInfo = () => {
    return fetch(config.baseUrl+'/users/me', {
        headers: {
            authorization: config.headers.authorization
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const updateUserInfo = (newUserName, newUserDescription) => {
    return fetch(config.baseUrl+'/users/me', {
        method: 'PATCH',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newUserName,
            about: newUserDescription
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const getInitialCards = () => {
    return fetch(config.baseUrl+'/cards', {
        headers: {
            authorization: config.headers.authorization
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const addNewCard = (cardName, cardLink) => {
    return fetch(config.baseUrl+'/cards', {
        method: 'POST',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const deleteCard = (cardId) => {
    return fetch(config.baseUrl+'/cards/'+cardId, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization,
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const addLikeCard = (cardId) => {
    return fetch(config.baseUrl+'/cards/likes/'+cardId, {
        method: 'PUT',
        headers: {
            authorization: config.headers.authorization,
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const deleteLikeCard = (cardId) => {
    return fetch(config.baseUrl+'/cards/likes/'+cardId, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization,
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const updateUserAvatar = (avatarUrl) => {
    return fetch(config.baseUrl+'/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatarUrl
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}
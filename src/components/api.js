import {request} from "./utlis";


const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20',
    headers: {
        authorization: '8e826e83-ec2e-4d15-8279-d177b3176ef2',
        'Content-Type': 'application/json'
    }
}

export const getUserInfo = () => {
    return request(config.baseUrl+'/users/me', {
        headers: {
            authorization: config.headers.authorization,
        },
    })
}

export const updateUserInfo = (newUserName, newUserDescription) => {
    return request(config.baseUrl+'/users/me', {
        method: 'PATCH',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newUserName,
            about: newUserDescription
        })
    })
}

export const getInitialCards = () => {
    return request(config.baseUrl+'/cards', {
        headers: {
            authorization: config.headers.authorization
        }
    })
}

export const addNewCard = (cardName, cardLink) => {
    return request(config.baseUrl+'/cards', {
        method: 'POST',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    });
}

export const deleteCard = (cardId) => {
    return request(config.baseUrl+'/cards/'+cardId, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization,
        }
    });
}

export const addLikeCard = (cardId) => {
    return request(config.baseUrl+'/cards/likes/'+cardId, {
        method: 'PUT',
        headers: {
            authorization: config.headers.authorization,
        }
    });
}

export const deleteLikeCard = (cardId) => {
    return request(config.baseUrl+'/cards/likes/'+cardId, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization,
        }
    });
}

export const updateUserAvatar = (avatarUrl) => {
    return request(config.baseUrl+'/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatarUrl
        })
    });
}
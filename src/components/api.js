const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20',
    headers: {
        authorization: '8e826e83-ec2e-4d15-8279-d177b3176ef2',
        'Content-Type': 'application/json'
    }
}

export const getInitialCards = () => {
    return fetch(config.baseUrl+'/cards', {
        headers: {
            authorization: config.headers.authorization
        }
    });
}

export const getUserInfo = () => {
    return fetch(config.baseUrl+'/users/me', {
        headers: {
            authorization: config.headers.authorization
        }
    });
}
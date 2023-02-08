export interface JwtContent {
    id: string;
    username: string;
    iat: Date;
    exp: Date;
}

export function getTokenFrom(request: any) {
    const valueInAuthHeader = request.headers.authorization;
    if (valueInAuthHeader && valueInAuthHeader.startsWith('Bearer ')) {
        return valueInAuthHeader.replace('Bearer ', '');
    }

    return null;
}

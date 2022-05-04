export const castAuth = (authData) => {
    return {
        accessToken: authData.access_token,
        refreshToken: authData.refresh_token,        
    }
}
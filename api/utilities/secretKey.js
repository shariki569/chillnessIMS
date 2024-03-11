import crypto from 'crypto'

const generateSecretKey = () =>  {
    const secretKey = crypto.randomBytes(32).toString('hex')
    return secretKey
}


export const secretKey = generateSecretKey()
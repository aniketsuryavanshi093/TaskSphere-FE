/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        serverActionsBodySizeLimit: '2mb',
    },
    images: {
       'domains' : ["firebasestorage.googleapis.com"],
    
    },
    env: {
        'NEXT_AUTH_GOOGLE_SECRET': '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',
        'AUTH_GOOGLE_CLIENTID': '848282207648-pbu7o6l8m818ms5drbur87m8rpmjbbi0.apps.googleusercontent.com',
        'NEXTAUTH_SECRET': "tasksphere",
        'GITHUB_CLIENTID': 'cdc9599afd5422a2355e',
        'GITHUB_SECRET': '6d1bd4a16789e26f2653ac70e623a7c84934ce56'
    }
}

module.exports = nextConfig

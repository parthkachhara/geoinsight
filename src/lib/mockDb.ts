import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'mockDb.json');

function getDb() {
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify([
            {
                id: '1',
                title: 'Impact of the new EU Carbon Border Adjustment Mechanism',
                content: 'The CBAM will significantly affect imports from non-EU countries with less stringent climate policies. This shifts the trade balance...',
                link_url: 'https://europa.eu',
                neutrality_score: 85,
                neutrality_tag: 'Highly Objective',
                upvotes: 24,
                downvotes: 2,
                created_at: new Date().toISOString(),
                profiles: { username: 'student_analyst' }
            },
            {
                id: '2',
                title: 'Tech Sanctions on Asian Chip Market',
                content: 'The recent blockades are ruining our economy. We must lift them immediately to save domestic hardware prices!',
                link_url: '',
                neutrality_score: 30,
                neutrality_tag: 'Strongly Biased',
                upvotes: 5,
                downvotes: 12,
                created_at: new Date(Date.now() - 86400000).toISOString(),
                profiles: { username: 'tech_trader_99' }
            }
        ], null, 2));
    }
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

export function getMockPosts() {
    return getDb();
}

export function addMockPost(post: any) {
    const db = getDb();
    db.unshift({
        id: Math.random().toString(),
        ...post,
        upvotes: 0,
        downvotes: 0,
        created_at: new Date().toISOString(),
        profiles: { username: 'guest_user' }
    });
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

export function mockVotePost(postId: string, voteType: number) {
    const db = getDb();
    const post = db.find((p: any) => p.id === postId);
    if (post) {
        if (voteType === 1) post.upvotes += 1;
        if (voteType === -1) post.downvotes += 1;
        fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    }
}

export function deleteMockPost(postId: string) {
    const db = getDb();
    const updatedDb = db.filter((p: any) => p.id !== postId);
    fs.writeFileSync(DB_PATH, JSON.stringify(updatedDb, null, 2));
}

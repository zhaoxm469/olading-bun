import { type Context } from 'hono'

interface PageViewData {
    uuid: string;
    url: string;
    duration: number;
    timestamp: number;
    // 其他可能的字段
}

interface ClickData {
    uuid: string;
    url: string;
    timestamp: number;
    buttonId: string;
    buttonName: string;
    // 其他可能的字段
}

// 使用内存存储数据（注意：这只是用于演示，实际应用中应使用数据库）
const pageViews: PageViewData[] = [];
const clicks: ClickData[] = [];

const analytics = {
    collectData: async (c: Context) => {
        const data = await c.req.json();

        if (data.eventName === 'pageExit') {
            pageViews.push(data.eventData as PageViewData);
        } else if (data.eventName === 'click') {
            clicks.push(data.eventData as ClickData);
        }

        console.log(data)

        return c.json({ success: true }, 200);
    },

    getPageViewStats: (c: Context) => {
        const stats = pageViews.reduce((acc, view) => {
            if (!acc[view.url]) {
                acc[view.url] = { totalDuration: 0, count: 0 };
            }
            acc[view.url].totalDuration += view.duration;
            acc[view.url].count += 1;
            return acc;
        }, {} as Record<string, { totalDuration: number, count: number }>);

        const formattedStats = Object.entries(stats).map(([url, data]) => ({
            url,
            averageDuration: data.totalDuration / data.count,
            visitCount: data.count
        }));

        console.log('Page View Statistics:');
        console.log(JSON.stringify(formattedStats, null, 2));

        return c.json(formattedStats, 200);
    }
};

export default analytics;
import { NextRequest, NextResponse } from 'next/server';
import { testData } from '../../pdfdatabase'; // Ensure correct path

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { boxid, name, company, metadata1 } = body;

        // Validate input
        if (!boxid || !name || !company || !metadata1) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        console.log('Before update:', JSON.stringify(testData, null, 2)); // Log before update

        // Add new item to the list
        testData.push({ boxid, name, company, metadata1 });

        console.log('After update:', JSON.stringify(testData, null, 2)); // Log after update

        return NextResponse.json({
            message: 'Item added successfully',
            before: testData.slice(0, testData.length - 1), // Data before adding
            after: testData // Data after adding
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// import { NextRequest, NextResponse } from 'next/server';
// import { testData } from '../../pdfdatabase'; // Ensure correct path

// export async function POST(req: NextRequest) {
//     try {
//         const body = await req.json();
//         const { boxid, name, company, metadata1 } = body;

//         // Validate input
//         if (!boxid || !name || !company || !metadata1) {
//             return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
//         }

//         // Add new item to the list
//         testData.push({ boxid, name, company, metadata1 });
//         return NextResponse.json({ message: 'Item added successfully', data: testData }, { status: 201 });
//     } catch (error) {
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }
// }
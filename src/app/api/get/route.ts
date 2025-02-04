import { NextRequest, NextResponse } from 'next/server';
import { testData } from '../../pdfdatabase'; 

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const company = searchParams.get('company') || '';
    const metadata1 = searchParams.get('metadata1') || '';
    const name = searchParams.get('name') || '';

    let filteredData = testData;

    if (company) {
        filteredData = filteredData.filter(doc => doc.company === company);
    }
    if (metadata1) {
        filteredData = filteredData.filter(doc => doc.metadata1 === metadata1);
    }
    if (name) {
        filteredData = filteredData.filter(doc => doc.name === name);
    }

    const companies = [...new Set(testData.map(doc => doc.company))];
    const metadata1Options = [...new Set(testData.map(doc => doc.metadata1))];
    const names = [...new Set(testData.map(doc => doc.name))];

    return NextResponse.json({
        documents: filteredData,
        companies,
        metadata1Options,
        names
    });
}
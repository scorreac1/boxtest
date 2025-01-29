export const mergePdfs = async (PDFCO_API_KEY: string, jsonPayload: string): Promise<{ mergedPdfUrl: string | null; error: string | null }> => {   
    console.log(jsonPayload);
    try {
        const response = await fetch('https://api.pdf.co/v1/pdf/merge', {
            method: 'POST',
            headers: {
                'x-api-key': PDFCO_API_KEY || '',
                'Content-Type': 'application/json',
            },
            body: jsonPayload
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { mergedPdfUrl: null, error: errorData.message || 'Failed to merge PDFs' };
        }

        const data = await response.json();
        return { mergedPdfUrl: data.url, error: null };
    } catch (error) {
        return { mergedPdfUrl: null, error: (error as Error).message };
    }
  };
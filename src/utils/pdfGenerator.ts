import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Generates an enhanced, branded PDF report from an HTML element.
 * Supports multi-page splitting and professional headers/footers.
 */
export const generatePDF = async (elementId: string, filename: string) => {
    let canvas;
    try {
        const element = document.getElementById(elementId);
        if (!element) throw new Error(`Element with id "${elementId}" not found`);

        // Use a more conservative scale to avoid memory issues on mobile/browsers
        // 1.5 is usually plenty for sharp text while significantly reducing memory usage
        canvas = await html2canvas(element, {
            scale: 1.5,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            // Remove windowWidth/Height as they can cause issues if calculated incorrectly
        });

        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;

        // Calculate the height of the content on an A4 page
        // We leave margin for Branding Header (22mm) and Footer (17mm)
        // marginY is the vertical space taken by header/footer + some padding
        const marginY = 45;
        const maxContentHeightPerPage = pageHeight - marginY;
        const imgHeightOnPdf = (contentHeight * imgWidth) / contentWidth;

        const totalPages = Math.ceil(imgHeightOnPdf / maxContentHeightPerPage);
        const pdf = new jsPDF('p', 'mm', 'a4', true); // Enable compression

        const imgData = canvas.toDataURL('image/jpeg', 0.85); // Use JPEG for better performance/smaller size

        const today = new Date().toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });

        for (let i = 0; i < totalPages; i++) {
            if (i > 0) pdf.addPage();

            // 1. Calculate Content Position
            const position = 25 - (i * maxContentHeightPerPage);

            // 2. Add Content
            pdf.addImage(imgData, 'JPEG', 5, position, 200, imgHeightOnPdf, undefined, 'FAST');

            // 3. Draw OVERLAYS (Header & Footer) to mask content bleeding

            // Header Overlay
            pdf.setFillColor(30, 58, 138); // #1e3a8a
            pdf.rect(0, 0, 210, 22, 'F');

            pdf.setTextColor(255, 255, 255);
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(16);
            pdf.text("VRK WEALTH", 15, 14);

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(8);
            pdf.text("STRATEGIC FINANCIAL SOLUTIONS", 15, 18);
            pdf.text(`Report Date: ${today}`, 195, 14, { align: 'right' });

            // Footer Overlay
            pdf.setFillColor(248, 250, 252); // bg-slate-50
            pdf.rect(0, 280, 210, 17, 'F');

            pdf.setTextColor(100, 116, 139); // text-slate-500
            pdf.setFontSize(8);
            pdf.text("www.vrkwealth.in | connect@vrkwealth.in", 105, 288, { align: 'center' });

            pdf.setFont("helvetica", "bold");
            pdf.text(`Page ${i + 1} of ${totalPages}`, 195, 288, { align: 'right' });

            pdf.setFont("helvetica", "italic");
            pdf.setFontSize(6);
            pdf.text("Disclaimer: Mutual fund investments are subject to market risks. Please read all scheme related documents carefully before investing.", 15, 294);
        }

        // Add Metadata
        pdf.setProperties({
            title: filename,
            subject: 'Financial Investment Report',
            author: 'VRK Wealth',
            keywords: 'SIP, Investment, Finance, Retirement',
            creator: 'VRK Wealth Enhanced PDF Generator'
        });

        pdf.save(`${filename}.pdf`);
        return true;
    } catch (error: any) {
        console.error('Detailed PDF Generation Error:', error);
        // Throw a more descriptive error
        throw new Error(error.message || 'Unknown PDF generation error');
    } finally {
        // Help GC if needed
        canvas = null;
    }
};

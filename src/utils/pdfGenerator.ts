import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Generates an enhanced, branded PDF report from an HTML element.
 * Supports multi-page splitting and professional headers/footers.
 */
export const generatePDF = async (elementId: string, filename: string) => {
    try {
        const element = document.getElementById(elementId);
        if (!element) throw new Error('Element not found');

        // Increase scale for high print quality (retina)
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
        });

        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;

        // Calculate the height of the content on an A4 page
        // We leave some margin for Header (25mm) and Footer (20mm)
        const marginY = 45;
        const maxContentHeightPerPage = pageHeight - marginY;
        const imgHeightOnPdf = (contentHeight * imgWidth) / contentWidth;

        const totalPages = Math.ceil(imgHeightOnPdf / maxContentHeightPerPage);
        const pdf = new jsPDF('p', 'mm', 'a4');

        const imgData = canvas.toDataURL('image/png', 1.0);

        for (let i = 0; i < totalPages; i++) {
            if (i > 0) pdf.addPage();

            // 1. Add Header Branding
            // Navy blue header bar
            pdf.setFillColor(30, 58, 138); // #1e3a8a
            pdf.rect(0, 0, 210, 22, 'F');

            // Text branding
            pdf.setTextColor(255, 255, 255);
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(16);
            pdf.text("VRK WEALTH", 15, 14);

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(8);
            pdf.text("STRATEGIC FINANCIAL SOLUTIONS", 15, 18);

            // Date on top right
            const today = new Date().toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
            pdf.text(`Report Date: ${today}`, 195, 14, { align: 'right' });

            // 2. Add Content
            // We use a vertical offset approach to place the content on each page.
            const position = 25 - (i * maxContentHeightPerPage);

            pdf.addImage(imgData, 'PNG', 5, position, 200, imgHeightOnPdf, undefined, 'FAST');

            // Cover up any content that bled into the header/footer zones
            pdf.setFillColor(255, 255, 255);
            // Re-draw header background white briefly if needed? No, just draw header/footer last.
            // Actually, we'll draw header/footer last on top of content.

            // Redraw Header on top of content
            pdf.setFillColor(30, 58, 138);
            pdf.rect(0, 0, 210, 22, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(16);
            pdf.text("VRK WEALTH", 15, 14);
            pdf.setFontSize(8);
            pdf.text("STRATEGIC FINANCIAL SOLUTIONS", 15, 18);
            pdf.text(`Report Date: ${today}`, 195, 14, { align: 'right' });

            // 3. Add Footer Branding
            pdf.setFillColor(248, 250, 252); // bg-slate-50
            pdf.rect(0, 280, 210, 17, 'F');

            pdf.setTextColor(100, 116, 139); // text-slate-500
            pdf.setFontSize(8);
            pdf.text("www.vrkwealth.in | connect@vrkwealth.in", 105, 288, { align: 'center' });

            pdf.setFont("helvetica", "bold");
            pdf.text(`Page ${i + 1} of ${totalPages}`, 195, 288, { align: 'right' });

            // Simple Disclaimer on every page footer
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
    } catch (error) {
        console.error('PDF Generation Error:', error);
        throw error;
    }
};

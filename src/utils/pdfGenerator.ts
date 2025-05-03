import { jsPDF } from "jspdf";
import type { Composer } from 'vue-i18n'

interface PDFGeneratorOptions {
    margin: number;
    pageWidth: number;
    pageHeight: number;
    leftColumnWidth: number;
}

export class PDFGenerator {
    private pdf: jsPDF;
    private i18n: Composer;
    private options: PDFGeneratorOptions;
    private leftY: number;
    private rightY: number;
    private rightColumnWidth: number;

    constructor(i18n: Composer, options?: Partial<PDFGeneratorOptions>) {
        this.i18n = i18n;
        this.options = {
            margin: 15,
            pageWidth: 210,
            pageHeight: 297,
            leftColumnWidth: 65,
            ...options
        };
        
        this.pdf = new jsPDF({
            format: 'a4',
            unit: 'mm'
        });

        this.leftY = this.options.margin;
        this.rightY = this.options.margin;
        this.rightColumnWidth = this.options.pageWidth - this.options.leftColumnWidth - (this.options.margin * 3);

        // Add background color
        this.pdf.setFillColor(37, 37, 38); // #252526
        this.pdf.rect(0, 0, this.options.pageWidth, this.options.pageHeight, 'F');
        
        // Set text color
        this.pdf.setTextColor(212, 212, 212); // #D4D4D4
    }

    private addHeader(): void {
        this.pdf.setFontSize(16);
        this.pdf.setFont("helvetica", "bold");
        this.pdf.text(this.i18n.t('header.name'), this.options.pageWidth / 2, this.leftY, { align: "center" });
        this.leftY += 6;
        this.pdf.setFontSize(10);
        this.pdf.setFont("helvetica", "normal");
        this.pdf.text(this.i18n.t('header.title'), this.options.pageWidth / 2, this.leftY, { align: "center" });
        this.leftY += 10;
        this.rightY = this.leftY;
    }

    private addLeftSection(title: string, contentFn: () => void): void {
        this.pdf.setFontSize(12);
        this.pdf.setFont("helvetica", "bold");
        this.pdf.text(title, this.options.margin, this.leftY);
        this.leftY += 7; // Increased from 5
        this.pdf.setLineWidth(0.2);
        this.pdf.setDrawColor(86, 156, 214); // #569CD6
        this.pdf.line(this.options.margin, this.leftY, this.options.margin + this.options.leftColumnWidth, this.leftY);
        this.leftY += 7; // Increased from 5
        this.pdf.setFontSize(9);
        this.pdf.setFont("helvetica", "normal");
        contentFn();
    }

    private addRightSection(title: string, contentFn: () => void): void {
        const startX = this.options.margin * 2 + this.options.leftColumnWidth;
        this.pdf.setFontSize(12);
        this.pdf.setFont("helvetica", "bold");
        this.pdf.text(title, startX, this.rightY);
        this.rightY += 5;
        this.pdf.setLineWidth(0.2);
        this.pdf.line(startX, this.rightY, startX + this.rightColumnWidth, this.rightY);
        this.rightY += 5;
        this.pdf.setFontSize(9);
        this.pdf.setFont("helvetica", "normal");
        contentFn();
    }

    private addLeftColumnText(text: string, indent: number = 0): void {
        const splitText = this.pdf.splitTextToSize(text, this.options.leftColumnWidth - indent);
        splitText.forEach(line => {
            if (this.leftY > this.options.pageHeight - this.options.margin) {
                this.pdf.addPage();
                this.leftY = this.options.margin;
            }
            this.pdf.text(line, this.options.margin + indent, this.leftY);
            this.leftY += 6; // Increased from 4
        });
    }

    private addRightColumnText(text: string, indent: number = 0): void {
        const startX = this.options.margin * 2 + this.options.leftColumnWidth;
        const splitText = this.pdf.splitTextToSize(text, this.rightColumnWidth - indent);
        splitText.forEach(line => {
            if (this.rightY > this.options.pageHeight - this.options.margin) {
                this.pdf.addPage();
                this.rightY = this.options.margin;
            }
            this.pdf.text(line, startX + indent, this.rightY);
            this.rightY += 4;
        });
    }

    public generate(): void {
        this.addHeader();

        // Left column content
        this.addLeftSection(this.i18n.t('contact.title'), () => {
            this.i18n.tm('contact.items').forEach(item => {
                
                this.pdf.setFont("helvetica", "bold");
                this.pdf.setTextColor(156, 220, 254); // #9CDCFE
                this.addLeftColumnText(`${item.label}:`, 6);
                
                this.pdf.setFont("helvetica", "normal");
                this.pdf.setTextColor(212, 212, 212); // #D4D4D4
                this.addLeftColumnText(item.value, 6);
            });
            this.leftY += 5; // Increased from 3
        });

        this.addLeftSection(this.i18n.t('summary.skillsTitle'), () => {
            this.i18n.tm('summary.skills').forEach(skill => {
                this.addLeftColumnText(`• ${skill}`, 3);
            });
            this.leftY += 5; // Increased from 3
        });

        this.addLeftSection(this.i18n.t('education.title'), () => {
            this.i18n.tm('education.schools').forEach(school => {
                this.pdf.setFont("helvetica", "bold");
                this.addLeftColumnText(school.name);
                this.pdf.setFont("helvetica", "normal");
                this.addLeftColumnText(`${school.degree}`);
                this.addLeftColumnText(`(${school.period})`);
                this.leftY += 3; // Increased from 2
            });
        });

        // Right column content
        this.addRightSection(this.i18n.t('experience.title'), () => {
            this.i18n.tm('experience.jobs').forEach(job => {
                const startX = this.options.margin * 2 + this.options.leftColumnWidth;
                
                this.pdf.setFont("helvetica", "bold");
                this.pdf.setTextColor(86, 156, 214); // #569CD6 for company name
                this.pdf.text(job.company, startX, this.rightY);
                
                this.pdf.setFont("helvetica", "italic");
                this.pdf.setTextColor(156, 220, 254); // #9CDCFE for period
                const periodText = `${job.period} | ${job.location}`;
                this.pdf.text(periodText, startX + this.rightColumnWidth, this.rightY, { align: "right" });
                this.rightY += 4;

                this.pdf.setFont("helvetica", "normal");
                this.pdf.setTextColor(78, 201, 176); // #4EC9B0 for job title
                this.pdf.text(job.title, startX, this.rightY);
                this.rightY += 4;

                this.pdf.setTextColor(212, 212, 212); // Reset to default text color
                if (job.description) {
                    this.addRightColumnText(job.description, 3);
                    this.rightY += 2;
                }
                if (job.responsibilities) {
                job.responsibilities.forEach(resp => {
                    if (typeof resp === 'string') {
                        this.addRightColumnText(`• ${resp}`, 3);
                    } else {
                        this.addRightColumnText(`• ${resp.title}`, 3);
                        // if (resp.details) {
                        //     resp.details.forEach(detail => {
                        //         this.addRightColumnText(`  - ${detail}`, 6);
                        //     });
                        // }
                    }
                });
            }
                this.rightY += 4;
            });
        });

        this.pdf.save('Dmitrii_Leshchenko_CV.pdf');
    }
}
<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { jsPDF } from "jspdf";
import Summary from './components/Summary.vue';
import Experience from './components/Experience.vue';
import Education from './components/Education.vue';

const { t } = useI18n();
const container = ref(null);

const generatePDF = async () => {
    const pdf = new jsPDF({
        format: 'a4'
    });
    const content = container.value;
    const a4PageHeight = 277; // 297mm (A4 height) - 20mm (top and bottom margins)
    const margins = { top: 10, right: 15, bottom: 10, left: 15 };

    if (content) {
        const scale = 0.25;
        const margins = { top: 10, right: 10, bottom: 10, left: 10 };

        await pdf.html(content, {
            html2canvas: { scale: scale },
            x: margins.left,
            y: margins.top ,
            windowWidth: 500,
            callback: function (pdf) {
                 // Estimate content height in PDF points (adjust as needed)
                const contentHeight  = pdf.internal.pageSize.getHeight() * scale; 

                if (contentHeight  > a4PageHeight) {
                    pdf.addPage(); // Add a blank second page for now
                }
                pdf.save('Dmitrii_Leshchenko_CV.pdf');
            }
        });
    }
};
</script>

<template>
  <div class="container" ref="container">
    <header>
      <h1>{{ t('header.name') }}</h1>
      <p>{{ t('header.title') }}</p>
    </header>

    <button @click="generatePDF">Generate PDF</button>

    <Summary />
    <Experience />
    <Education />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&family=Inter:wght@300;400;600&display=swap');

body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background-color: #1E1E1E;
    color: #D4D4D4;
}

.container {
    max-width: 900px;
    margin: 40px auto;
    padding: 30px;
    background-color: #252526;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}

h1, h2, h3 {
    color: #D4D4D4;
    margin-bottom: 20px;
}

h1 {
    font-family: 'Fira Code', monospace;
    text-align: center;
    font-weight: 700;
    font-size: 2.5em;
    margin-bottom: 10px;
}
 
h2 {
    font-weight: 600;
    font-size: 2em;
    border-bottom: 2px solid #569CD6;
    padding-bottom: 5px;
}

h3 {
    font-weight: 400;
    font-size: 1.6em;
    color: #569CD6;
}

.section {
    margin-bottom: 40px;
    padding: 20px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.section:hover {
    background-color: #2E2E2F;
}

.job-title {
    font-weight: 600;
    color: #4EC9B0;
}

.job-details {
    font-style: italic;
    color: #9CDCFE;
    margin-bottom: 10px;
}

.list-item-container {
    text-align: left;
}

ul {
    list-style: square;
    margin-left: 20px;
    padding-left: 0;
}

li {
    margin-bottom: 5px;
}

a {
    color: #569CD6;
    text-decoration: none;
}
</style>

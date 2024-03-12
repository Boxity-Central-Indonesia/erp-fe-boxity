export const downloadReport = async () => {
    try {
      const { data, status } = await getApiData("download/sales-report");
      if (status === 200) {
        const pdfUrl = data;

        // Create a hidden link
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.target = "_blank"; // Open in a new tab/window
        link.download = data; // Set the desired file name

        // Append the link to the document
        document.body.appendChild(link);

        // Simulate a click to trigger the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error(error);
    }
  };
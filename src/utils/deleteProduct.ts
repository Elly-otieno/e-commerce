export async function deleteProduct(productId: number): Promise<void> {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete product. Status: ${response.status}, Message: ${errorText}`);
      }
  
      console.log(`Product with ID ${productId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
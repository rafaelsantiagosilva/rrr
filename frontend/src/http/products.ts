export async function getProducts() {
  const response = await fetch('http://localhost:3333/products');
  const data = await response.json();
  return data;
}

export async function deleteProduct(id: string) {
  console.log(`> id: ${id}`);
  const response = await fetch(`http://localhost:3333/products/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    alert('Erro ao excluir produto');
    console.table(await response.json());
    return;
  }
}
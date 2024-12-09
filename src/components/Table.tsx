"use client";

import React, { useEffect, useState } from "react";
import {
  IndexTable,
  LegacyCard,
  Thumbnail,
  Modal,
  TextContainer,
  Text,
} from "@shopify/polaris";
import { fetchProducts } from "@/api/fetchApi";
import { IProduct } from "@/interfaces/IProduct";


const ProductTable = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct|null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetch = async () => {
    const response = await fetchProducts();
    if(response){
      setProducts(response.data)
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleRowClick = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);  
    setSelectedProduct(null);
  };

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const rowMarkup = products.map((product, index) => (
    <IndexTable.Row
      id={product.id.toString()}
      key={product.id}
      position={index}
      onClick={() => handleRowClick(product)}
    >
      <IndexTable.Cell>
        <div className="flex items-center gap-4">
          <Thumbnail source={product.image || "https://via.placeholder.com/50"} alt={product.title} />
          <Text as="span" variant="bodyMd" fontWeight="semibold">
            {product.title}
          </Text>
        </div>
      </IndexTable.Cell>

      <IndexTable.Cell>
        <Text as="span">${product.price.toFixed(2)}</Text>
      </IndexTable.Cell>

      <IndexTable.Cell>
        <Text as="span">{product.category}</Text>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <div style={{ padding: "20px" }}>
      <LegacyCard>
        <IndexTable
          resourceName={resourceName}
          itemCount={products.length}
          headings={[
            { title: "Product" },
            { title: "Price" },
            { title: "Category" },
          ]}
          selectable={false}
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>

      {selectedProduct && (
        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          title={selectedProduct.title}
          primaryAction={{
            content: "Close",
            onAction: handleModalClose,
          }}
        >
          <Modal.Section>
            <TextContainer>
              <Thumbnail
                source={selectedProduct.image}
                alt={selectedProduct.title}
                size="large"
              />
              <Text as="p">
                <strong>Category:</strong> {selectedProduct.category}
              </Text>
              <Text as="p">
                <strong>Price:</strong> ${selectedProduct.price.toFixed(2)}
              </Text>
              <Text as="p">
                <strong>Rating:</strong> {selectedProduct.rating.rate} (
                {selectedProduct.rating.count} reviews)
              </Text>
              <Text as="p">
                <strong>Description:</strong> {selectedProduct.description}
              </Text>
            </TextContainer>
          </Modal.Section>
        </Modal>
      )}
    </div>
  );
};

export default ProductTable;

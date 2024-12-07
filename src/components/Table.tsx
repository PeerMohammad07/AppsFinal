import React, { useEffect, useState } from 'react';
import {
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
} from '@shopify/polaris';
import { fetchProducts } from '@/api/fetchApi'; // Make sure this API function is correctly fetching the data

const Table = () => {
  const [products, setProducts] = useState<any[]>([]);

  const fetch = async () => {
    try {
      const response = await fetchProducts();
      if (Array.isArray(response?.data)) {
        setProducts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const rowMarkup = products.map(({ id, title, price, category, description }, index) => (
    <IndexTable.Row id={id.toString()} key={id} position={index}>
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="bold" as="span">
          {title}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>{category}</IndexTable.Cell>
      <IndexTable.Cell>{description}</IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="span" alignment="end" numeric>
          ${price.toFixed(2)}
        </Text>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <LegacyCard>
      <IndexTable
        resourceName={resourceName}
        itemCount={products.length}
        headings={[
          { title: 'Product Name' },
          { title: 'Category' },
          { title: 'Description' },
          { title: 'Price', alignment: 'end' },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
};

export default Table;

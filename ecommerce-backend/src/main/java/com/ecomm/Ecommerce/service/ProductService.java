package com.ecomm.Ecommerce.service;

import com.ecomm.Ecommerce.model.Product;
import com.ecomm.Ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;


    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void add(Product product) {
        productRepository.save(product);
    }

    public Product addProduct(Product product, MultipartFile imageFile) throws IOException {
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes());
        productRepository.save(product);
        return product;
    }

    public Optional<Product> getProductById(int id) {
        return productRepository.findById(id);
    }


    public List<Product> searchProducts(String keyword) {
        return productRepository.searchProducts(keyword);
    }
}

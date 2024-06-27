package com.team1.movie.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team1.movie.entity.ImageFile;
import com.team1.movie.repository.ImageRepository;


@Service
public class ImageServiceImpl implements ImageService{

	@Autowired
    ImageRepository repository;

    @Override
    public void insert(ImageFile imageFile) {
      repository.save(imageFile);
    }

    @Override
    public ImageFile getImageById(String id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<ImageFile> getImageList() {
        return List.of();
    }

    @Override
    public void saveMovie(String imageId, String trueTitle, String predTitle1, String predTitle2, String predTitle3) {
        Optional<ImageFile> imageFileOptional = repository.findById(imageId);
        if (imageFileOptional.isPresent()) {
            ImageFile imageFile = imageFileOptional.get();
            imageFile.setTruthTitle(trueTitle);
            imageFile.setPredTitle1(predTitle1);
            imageFile.setPredTitle2(predTitle2);
            imageFile.setPredTitle3(predTitle3);
            repository.save(imageFile);
        } else {
            throw new IllegalArgumentException("ImageFile not found with id: " + imageId);
        }
    }
    
    @Override
    public Long findMaxSeqNo() {
        return repository.findMaxSeqNo();
    }
}

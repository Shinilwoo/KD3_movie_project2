package com.team1.movie.service;

import java.util.List;

import com.team1.movie.entity.ImageFile;


public interface ImageService {
	public void insert(ImageFile imageFile);
	public ImageFile getImageById(String id);
	public List<ImageFile> getImageList();
	public void saveMovie(String imageId, String movieIndex, String predTitle1, String predTitle2, String predTitle3);
}
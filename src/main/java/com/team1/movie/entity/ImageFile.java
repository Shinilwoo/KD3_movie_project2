package com.team1.movie.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ImageFile {
	@Id
	private String id;

	@Column(name = "true_title", columnDefinition = "varchar(1024)")
	private String truthTitle;

	@Column(name = "pred_title1", columnDefinition = "varchar(1024)")
	private String predTitle1;
	
	@Column(name = "pred_title2", columnDefinition = "varchar(1024)")
    private String predTitle2;

    @Column(name = "pred_title3", columnDefinition = "varchar(1024)")
    private String predTitle3;
    
	@Lob
	@Column(name = "image", columnDefinition = "LONGBLOB")
	private byte[] photo;
}

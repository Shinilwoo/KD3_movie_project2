package com.team1.movie.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
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

	@Column(name = "seq_No", columnDefinition = "BIGINT")
	private Long seqNo;

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

	@CreatedDate
	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@LastModifiedDate
	@Column(name = "updated_at", nullable = true)
	private LocalDateTime updatedAt;

	// 최초 생성(insert)시 날짜시간
	@PrePersist
	protected void onCreate() {
		if (this.createdAt == null) {
			this.createdAt = LocalDateTime.now();
		}
	}

	// 수정(update)시 날짜시간
	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = LocalDateTime.now();
	}
}

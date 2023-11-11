package com.kaique.crudspring.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Data
@Entity
@SQLDelete(sql = "UPDATE Course SET status = 'Inativo' WHERE id = ?")
@Where(clause = "status = 'Ativo'")
//@Table(name = "cursos")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private Long id;

    @NotBlank
    @NotNull
    @Size(min = 5, max = 100)
    @Column(nullable = false, length = 100)
    private String name;

    @NotBlank
    @NotNull
    @Pattern(regexp = "Back-end | Front-End")
    @Column(nullable = false)
    private String category;

    @NotBlank
    @NotNull
    @Pattern(regexp = "Ativo|Inativo")
    @Column(nullable = false)
    private String status = "Ativo";
}

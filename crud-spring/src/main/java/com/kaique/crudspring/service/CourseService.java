package com.kaique.crudspring.service;

import com.kaique.crudspring.dto.CourseDTO;
import com.kaique.crudspring.dto.mapper.CourseMapper;
import com.kaique.crudspring.enums.Category;
import com.kaique.crudspring.exception.RecordNotFoundException;
import com.kaique.crudspring.repository.CourseRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Validated
@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    public CourseService(CourseRepository courseRepository, CourseMapper courseMapper) {
        this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
    }

    public List<CourseDTO> listCourses() {
        return courseRepository.findAll()
                .stream().map(courseMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<CourseDTO> findById(@PathVariable @NotNull @Positive Long id) {
        return Optional.ofNullable(courseRepository.findById(id).map(courseMapper::toDTO)
                .orElseThrow(() -> new RecordNotFoundException(id)));
    }

    public CourseDTO createCurse(@Valid @NotNull CourseDTO course) {
        return courseMapper.toDTO(courseRepository.save(courseMapper.toEntity(course)));
    }

    public CourseDTO update(@NotNull @PathVariable Long id, @Valid CourseDTO course) {
        return courseRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(course.name());
                    recordFound.setCategory(Category.FRONT_END);
                    return courseRepository.save(recordFound);
                }).map(courseMapper::toDTO).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@PathVariable Long id) {
        courseRepository.delete(courseRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id)));
    }
}

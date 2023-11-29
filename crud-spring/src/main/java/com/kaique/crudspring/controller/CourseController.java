package com.kaique.crudspring.controller;

import com.kaique.crudspring.dto.CourseDTO;
import com.kaique.crudspring.dto.CoursePageDTO;
import com.kaique.crudspring.repository.CourseRepository;
import com.kaique.crudspring.service.CourseService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Validated
@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService, CourseRepository courseRepository) {
        this.courseService = courseService;
    }

    @GetMapping
    public CoursePageDTO listCourses(
            @RequestParam(defaultValue = "0") @PositiveOrZero int page,
            @RequestParam(defaultValue = "10") @Positive @Max(10)
            int pageSize
    ) {
        return courseService.listCourses(page, pageSize);
    }

    @GetMapping("/{id}")
    public Optional<CourseDTO> findById(@PathVariable @NotNull @Positive Long id) {
        return courseService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CourseDTO createCurse(@RequestBody @Valid @NotNull CourseDTO course) {
        return courseService.createCurse(course);
    }

    @PutMapping("/{id}")
    public CourseDTO update(@PathVariable Long id, @RequestBody CourseDTO course) {
        return courseService.update(id, course);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        courseService.delete(id);
    }
}

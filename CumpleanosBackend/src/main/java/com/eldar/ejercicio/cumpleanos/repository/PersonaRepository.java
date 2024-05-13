package com.eldar.ejercicio.cumpleanos.repository;

import com.eldar.ejercicio.cumpleanos.entity.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonaRepository extends JpaRepository<Persona, Integer> {
    public List<Persona> findByConfirmadoFalse();
}

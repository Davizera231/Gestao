/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.comercio.repository;

import com.comercio.model.Contato;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;




/**
 *
 * @author Davi
 */

// ContatoRepository.java
public interface ContatoRepository extends JpaRepository<Contato, Integer> {
    List<Contato> findByClienteId(Integer clienteId); // Método derivado do JPA
}


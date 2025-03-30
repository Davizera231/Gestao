/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.comercio.repository;

import com.comercio.model.Cliente;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    // Métodos customizados (se necessário)
     
        @Query("SELECT c FROM Cliente c WHERE " +
               "(:nome IS NULL OR c.nome LIKE %:nome%) AND " +
               "(:cpf IS NULL OR c.cpf LIKE %:cpf%)")
        List<Cliente> findByNomeOrCpf(
            @Param("nome") String nome,
            @Param("cpf") String cpf
        );
    
    
    
    
    
   // List<Cliente> findByNomeContaining(String nome);
   // List<Cliente> findByCpf(String cpf);
   // List<Cliente> findByNomeContainingAndCpf(String nome, String cpf); 
   // boolean existsByCpf(String cpf);

  //  @Override
  //  public Optional<Cliente> findById(Integer id);

   // public List<Cliente> findByNomeContainingIgnoreCase(String nome);

    public boolean existsByCpf(String cpf);
}
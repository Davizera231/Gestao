/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.comercio.service;

import com.comercio.model.Cliente;
import com.comercio.repository.ClienteRepository;
import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {
    
    @Autowired
    private ClienteRepository repository;
    
    public Cliente salvar(Cliente cliente) {
        return repository.save(cliente);
    }
    
    public List<Cliente> listarTodos() {
        return repository.findAll();
    }
    
    public Optional<Cliente> buscarPorId(Integer id) {
        return repository.findById(id);
    }
    
    public void excluir(Integer id) {
        repository.deleteById(id);
    } 
    
    public Cliente atualizarCliente(Integer id, Cliente clienteAtualizado){
        clienteAtualizado.setId(id);
        return repository.save(clienteAtualizado);
    }
    
  //  public List<Cliente> buscarPorNome(String nome) {
   //     return repository.findByNomeContainingIgnoreCase(nome);
  //  }
    
   // public Cliente buscarPorCpf(String cpf) {
    //    return repository.findByCpf(cpf);
   // }
    
    public List<Cliente> buscarPorNomeECpf(String nome, String cpf) {
        if (nome != null  || cpf != null ) {
        } else { 
            return repository.findAll();
        }
        return repository.findByNomeOrCpf(nome, cpf);
    }
    
   //  public List<Cliente> buscarPorNomeECpf(String nome, String cpf) {
    //    if (nome != null && cpf != null) {
    //        return repository.findByNomeContainingAndCpf(nome, cpf);
    //    } else if (nome != null) {
    //        return repository.findByNomeContaining(nome);
     //   } else if (cpf != null) {
     //       return repository.findByCpf(cpf);
     //   }
    //    return Collections.emptyList();
   // }

   // public boolean existePorCpf(String cpf) {
    //    return repository.existsByCpf(cpf);
    //}
    
}
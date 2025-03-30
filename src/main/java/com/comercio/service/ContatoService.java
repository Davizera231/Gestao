/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.comercio.service;

import com.comercio.model.Contato;
import com.comercio.repository.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
/**
 *
 * @author Davi
 */
@Service
public class ContatoService {
    
    @Autowired
    private ContatoRepository repository;
    
    public Contato criarContato(Contato contato){
        return repository.save(contato);
    }
    
    public List<Contato> listarContatos(){
        return repository.findAll();
    }
    
    public Contato salvar(Contato contato){
        return repository.save(contato);
        
    }
    
    public List<Contato> listarContatosPorCliente(Integer clienteId){
        return repository.findByClienteId(clienteId);
    }
    
    public Optional<Contato> buscarPorId(Integer id){
        return repository.findById(id);
    }
    
    
    public Contato atualizarContato(Integer id, Contato contatoAtualizado) {
        return repository.findById(id)
            .map(contatoExistente -> {
                contatoExistente.setTipo(contatoAtualizado.getTipo());
                contatoExistente.setValor(contatoAtualizado.getValor());
                contatoExistente.setObservacao(contatoAtualizado.getObservacao());
                return repository.save(contatoExistente); // Atualiza o registro existente
            })
            .orElseThrow(() -> new RuntimeException("Contato não encontrado"));
    }
    
    public void excluir(Integer id){
        repository.deleteById(id);
   
    }

    
  
}

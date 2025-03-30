package com.comercio.controller;

import com.comercio.model.Cliente;
import com.comercio.model.Contato;
import com.comercio.repository.ClienteRepository;
import com.comercio.repository.ContatoRepository;
import com.comercio.service.ContatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;

/**
 * Controller for handling Contact-related HTTP requests
 * @author Davi
 */
@RestController
@RequestMapping("/api/contatos")
public class ContatoController {
    
    @Autowired
    private ContatoService service;
    
    @Autowired
    private ClienteRepository clienteRepository; // Note o "c" minúsculo

    @Autowired
    private ContatoRepository contatoRepository; // Note o "c" minúsculo
    
    // ContatoController.java
   // @PostMapping
  //  public ResponseEntity<Contato> salvar(@RequestBody Contato contato) {
   //     Contato contatoSalvo = service.salvar(contato);
   //     return ResponseEntity.status(HttpStatus.CREATED).body(contatoSalvo);
   // } 
    
    @PostMapping
    public ResponseEntity<?> salvarContato(@RequestBody Contato contato) {
        try {
            if (contato.getCliente() == null || contato.getCliente().getId() == null) {
                return ResponseEntity.badRequest().body("ID do cliente é obrigatório");
            }

            // Verifica se o cliente existe
            Optional<Cliente> cliente = clienteRepository.findById(contato.getCliente().getId());
            if (!cliente.isPresent()) {
                return ResponseEntity.badRequest().body("Cliente não encontrado");
            }

            contato.setCliente(cliente.get());
            Contato contatoSalvo = contatoRepository.save(contato);
            return ResponseEntity.ok(contatoSalvo);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro interno: " + e.getMessage());
        }
    }
    
    @GetMapping
    public List<Contato> listarContatos() {
        return service.listarContatos();
    }
    
    // ContatoController.java
    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<Contato>> listarContatosPorCliente(@PathVariable Integer clienteId) {
        try {
            List<Contato> contatos = service.listarContatosPorCliente(clienteId);
            return ResponseEntity.ok(contatos);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/{id}")
    public Optional<Contato> buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id);
    }
    
    @PutMapping("/{id}")
    public Contato atualizarContato(@PathVariable Integer id, @RequestBody Contato contato) {
        return service.atualizarContato(id, contato);    
    }
    
    @DeleteMapping("/{id}")
    public void deletarContato(@PathVariable Integer id) {
        service.excluir(id);
    }
}
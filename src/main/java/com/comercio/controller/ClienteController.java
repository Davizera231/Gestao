package com.comercio.controller;

import com.comercio.model.Cliente;
import com.comercio.service.ClienteService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
        

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
    
    @Autowired
    private ClienteService service;
    
    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody Cliente cliente) {
        // Validação do CPF
        if (!validarCPF(cliente.getCpf())) {
            return ResponseEntity.badRequest().body("CPF inválido");
        }

        Cliente clienteSalvo = service.salvar(cliente);
        return ResponseEntity.ok(clienteSalvo);
    }

    private boolean validarCPF(String cpf) {
        cpf = cpf.replaceAll("[^0-9]", "");
        return cpf.length() == 11;
    }
    
    @GetMapping
    public ResponseEntity<List<Cliente>> listarTodos() {
        List<Cliente> clientes = service.listarTodos();
        return ResponseEntity.ok(clientes);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizar(@PathVariable Integer id, @RequestBody Cliente cliente) {
        return service.buscarPorId(id)
                .map(clienteExistente -> {
                    cliente.setId(id);
                    Cliente clienteAtualizado = service.salvar(cliente);
                    return ResponseEntity.ok(clienteAtualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Integer id) {
        if (service.buscarPorId(id).isPresent()) {
            service.excluir(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    
    @GetMapping("/buscar")
    public ResponseEntity<List<Cliente>> buscar(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String cpf) {
        
        String cpfSemFormatacao = (cpf != null) ? cpf.replaceAll("[^0-9]", "") : null;
        
        // Busca clientes (com ou sem filtros)
        List<Cliente> clientes = service.buscarPorNomeECpf(nome, cpfSemFormatacao);
        return ResponseEntity.ok(clientes);
        
    }
    
}
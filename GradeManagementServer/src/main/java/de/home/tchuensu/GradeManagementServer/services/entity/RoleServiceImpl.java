package de.home.tchuensu.GradeManagementServer.services.entity;

import de.home.tchuensu.GradeManagementServer.dao.repository.RoleRepository;
import de.home.tchuensu.GradeManagementServer.model.entity.Role;
import de.home.tchuensu.GradeManagementServer.model.entity.RoleNames;
import de.home.tchuensu.GradeManagementServer.web.exception.RoleNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService{

    @Autowired
    RoleRepository roleRepository;


    /*
    @Override
    public Role create(RoleDto roleDto) {
        Role role = roleRepository.findbyName(roleDto.getName());
        if(role == null) {
            role = new Role();
        }
        return null;
    }*/

    @Override
    public Role getByName(String name) {
        Role role = roleRepository.findByName(RoleNames.valueOf(name.toUpperCase()));
        if(role != null) {
            return  role;
        }
        throw new RoleNotFoundException("No such role with name: <<" + name + ">> was fount ");
    }

    @Override
    public Role getById(Long id) {

        Role role = roleRepository.findById(id).get();
        if(role != null) {
            return role;
        }
        throw new RoleNotFoundException("No role found matching the id <<" + id + ">>");
    }

    //public Role create(Role)
}

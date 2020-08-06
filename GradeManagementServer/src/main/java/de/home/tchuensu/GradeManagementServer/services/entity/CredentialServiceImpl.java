package de.home.tchuensu.GradeManagementServer.services.entity;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.CredentialDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.RoleDto;
import de.home.tchuensu.GradeManagementServer.dao.repository.CredentialRepository;
import de.home.tchuensu.GradeManagementServer.model.entity.Credential;
import de.home.tchuensu.GradeManagementServer.model.entity.Role;
import de.home.tchuensu.GradeManagementServer.model.entity.RoleNames;
import de.home.tchuensu.GradeManagementServer.web.exception.CredentialNotCreatedException;
import de.home.tchuensu.GradeManagementServer.web.exception.CredentialNotFoundException;
import de.home.tchuensu.GradeManagementServer.web.exception.UsernameAlreadyInUseException;
import de.home.tchuensu.GradeManagementServer.web.exception.UsernameNotGeneratedException;
import org.passay.CharacterData;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

//TODO: revise this implementation to take into account the augemented Role class.

@Service
public class CredentialServiceImpl  implements CredentialService {

    @Autowired
    CredentialRepository credentialRepository;

    @Autowired
    RoleServiceImpl roleService;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public Credential create(CredentialDto credentialDto) {

        Credential credential = credentialRepository.findByUsername(credentialDto.getUsername());
        // If no credential matching the specified username is found then we can proceed to creating a new credential
        // using username else we throw an exception informing that this username is already in use.
        if(credential == null) {

            // If one of the specified roles those not match those in the
            // database, the credential will not be created and
            // an exception is thrown
            Set<Role> roleSet = new HashSet<>();
            for(RoleDto roleDto : credentialDto.getRoles()) {
                Role role = roleService.getByName(roleDto.getName().toUpperCase());
                if(role == null){
                    throw new CredentialNotCreatedException("The credential could not be created due to an unknown Role_Name");
                }
                roleSet.add(role);
            }

            credential = new Credential(
                    credentialDto.getUsername(),
                    bCryptPasswordEncoder.encode(credentialDto.getPasswordHash())
            );

            // Ensures the relation between the credential an the roles in the database
            credential.setRoles(roleSet);

            credential = credentialRepository.save(credential);
            return credential;

        }
        throw new UsernameAlreadyInUseException("The desired username is already in use");
    }


    @Override
    public Credential getByUsername(String username) {

        Credential credential = credentialRepository.findByUsername(username);
        if(credential != null) {
            return credential;
        }

        throw new CredentialNotFoundException("No Credential with the username matching  " + username + " was found !!!");
    }

    @Override
    public boolean checkExistsById(Long id) {
       return credentialRepository.existsById(id);
    }


    @Override
    public Credential updatePassword(String username, String newPassword) {

        Credential credential = credentialRepository.findByUsername(username);

        if(credential != null) {
            credential.setPasswordHash(bCryptPasswordEncoder.encode(newPassword));
            credential = credentialRepository.save(credential);
            return credential;
        }
        throw new CredentialNotFoundException("The Credential with the username : " + username + "that your trying " +
                " to update does not exist !!!");
    }

    @Override
    public String generateUsernames(String firstname, String lastname) {

        firstname = firstname.replaceAll("\\s","").toLowerCase();
        lastname = lastname.replaceAll("\\s","").toLowerCase();

        String generatedUsername = null;
        int lengthLastname = lastname.length();
        //int lengthFirstname = firstname.length();
        int numberOfTruncatedCharacter = 0;

        do {
            String tmp = firstname + "." + lastname.substring(0, lengthLastname  - numberOfTruncatedCharacter);
            if(credentialRepository.findByUsername(tmp) == null) {
                generatedUsername = tmp;

                return generatedUsername;
            }
            numberOfTruncatedCharacter++;

        }while(generatedUsername == null && numberOfTruncatedCharacter < lengthLastname);

        throw new UsernameNotGeneratedException("No Suitable username could be generated for the credential username");
    }



    public String generatePassword() {

        List<CharacterRule> rules = Arrays.asList(

                // at least one lower-case character
                new CharacterRule(EnglishCharacterData.LowerCase, 1),

                // at least one upper-case character
                new CharacterRule(EnglishCharacterData.UpperCase, 1),

                // at least one digit character
                new CharacterRule(EnglishCharacterData.Digit, 1),

                // at least one special character
                new CharacterRule(new CharacterData() { // this anonymous class enables the restriction of the special
                                                        // characters domain
                    @Override
                    public String getErrorCode() {
                        return "ERR_SPECIAL_CHARACTER";
                    }

                    @Override
                    public String getCharacters() {
                        return "!@#$%^&*()_+";
                    }
                }, 1)
        );

        PasswordGenerator passwordGenerator = new PasswordGenerator();

        // Generate a random password of 20 characters long, which complies with the previously defined  policy
        String defaultPassword = passwordGenerator.generatePassword(20, rules);
        return defaultPassword;
    }
}
